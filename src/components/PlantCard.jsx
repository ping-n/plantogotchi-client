import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function Plant({
  id,
  alive,
  name,
  breed_id,
  water_level,
  food_level,
  growth_stage,
  breed_name,
  created_at,
}) {
  return (
    <Card>
      <Image src="" wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span className="date">{created_at}</span>
        </Card.Meta>
        <Card.Description>
          {name} is a {breed_name} plant.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to={`/plants/${id}`}>
          <Icon name="lab" />
          Show
        </Link>
      </Card.Content>
    </Card>
  );
}
