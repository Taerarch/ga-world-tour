import React, { useState } from 'react';
import World from '@svg-maps/world';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css'


function WorldMap () {
  // eslint-disable-next-line
  const [property, setProperty] = useState("pop_est");

  return (
    <SVGMap map={World} />
  );

}

export default WorldMap;
