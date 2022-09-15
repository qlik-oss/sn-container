import objectDefinition from './object-definition';
import dataDefinition from './data-definition';

export default function qae() {
  return {
    properties: objectDefinition(),
    data: dataDefinition(),
  };
}
