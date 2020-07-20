import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function Plant({ plant, updateWaterLevel }) {
  return (
    <Card>
      <Image src="" wrapped ui={false} />
      <Card.Content>
        <Card.Header>{plant.name}</Card.Header>
        <Card.Meta>
          <span className="date">{plant.created_at}</span>
        </Card.Meta>
        <Card.Description>
          {plant.name} is a {plant.breed.name} plant.
          {plant.name}'s water level is currently {plant.water_level}%.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link
          to={{
            pathname: `/plants/${plant.id}`,
            plant: { plant },
            updateWaterLevel: { updateWaterLevel },
          }}
        >
          <Icon name="lab" />
          Show
        </Link>
      </Card.Content>
    </Card>
  );
}
