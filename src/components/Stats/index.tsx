import React, { FunctionComponent } from "react";
import { IStatsComponent } from "../../utils/Interfaces/interfaces";
import "./Stats.scss";

const Stats: FunctionComponent<IStatsComponent> = ({ stats }) => {
  return (
    <div className="Stats">
      <div className="Stats-Item">
        <p className="Stats-Item_heading">Total Countries</p>
        <p className="Stats-Item_value">{stats?.countries}</p>
      </div>
      <div className="Stats-Item">
        <p className="Stats-Item_heading">Total Area Size</p>
        <p className="Stats-Item_value">{stats?.totalArea?.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Stats;
