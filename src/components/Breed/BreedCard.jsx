import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function BreedCard({ breed }) {
  return (
    <Card>
      <Image src="" wrapped ui={false} />
      <Card.Content>
        <Card.Header>{breed.name}</Card.Header>
        <Card.Description>{breed.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link
          to={{
            pathname: `/breeds/${breed.id}`,
            breed: { breed },
          }}
        >
          <Icon name="lab" />
          Show
        </Link>
        <Link
          to={{
            pathname: `/breeds/edit/${breed.id}`,
            breed: { breed },
          }}
        >
          <Icon name="lab" />
          Edit
        </Link>
      </Card.Content>
    </Card>
  );
}
