/**
 * @namespace properties
 * @entry
 */
const objectDefinition = () => {
  /**
   * @lends properties
   */
  const definition = {
    /**
     * Current version of this generic object definition
     * @type {string}
     * @default
     */
    version: process.env.PACKAGE_VERSION,
    /**
     * Show title for the visualization.
     * @type {boolean=}
     * @default
     */
    showTitles: true,
    /**
     * Visualization subtitle.
     * @type {(string|StringExpression)=}
     * @default
     */
    subtitle: '',
    /**
     * Visualization title.
     * @type {(string|StringExpression)=}
     * @default
     */
    title: '',
  };

  return definition;
};

export default objectDefinition;

/**
 * Extends `HyperCubeDef`, see Engine API: `HyperCubeDef`.
 * @typedef {object} qHyperCubeDef
 * @property {DimensionProperties[]} qDimensions
 * @property {boolean} qSuppressMissing=true
 */

/**
 * Extends `NxDimension`, see Engine API: `NxDimension`.
 * @typedef {object} DimensionProperties
 * @extends NxDimension
 * @property {AttributeDimensionProperties[]} qAttributeDimensions
 * @property {InlineDimensionDef} qDef
 */

/**
 * Extends `NxInlineDimensionDef`, see Engine API: `NxInlineDimensionDef`.
 * @typedef {object} InlineDimensionDef
 * @extends NxInlineDimensionDef
 * @property {boolean=} autoSort Set to automatically sort the dimension.
 * @property {string=} cId ID used by the Qlik Sense. Must be unique within the current chart.
 * @property {string|StringExpression} othersLabel
 */

/**
 * Extends `NxAttrDimDef`, see Engine API: `NxAttrDimDef`.
 * @typedef {object} AttributeDimensionProperties
 * @extends NxAttrDimDef
 * @property {string} id - One of: `colorByAlternative`: colors the chart using different dimensions (can be used together with color.mode="byDimension") or `colorByExpression` together with color.mode="byExpression".
 */

/**
 * @typedef {object} ExpressionProperty
 * @property {string} label Label for the expression
 * @property {string} key Expression or library id
 * @property {'expression'|'libraryItem'} type How to interpret the key
 */

/**
 * Set to define the size of the shapes.
 * @typedef {object} size
 * @property {number} radiusMin Sets the minimum radius of symbol in pixels.
 * @property {number} radiusMax Sets the maximum radius of symbol in pixels.
 */

/**
 * Set to define the coloring of the shapes.
 * @typedef {object} color
 * @property {'primary'} mode Sets the coloring mode for the visualization when auto-coloring has been switched off (`"auto": false`).
 * @property {paletteColor} paletteColor The paletteColor object is used to define the color when you color by single color `("mode": "primary")`.
 */

/**
 * Color information structure. Holds the actual color and index in palette.
 * @typedef {object} paletteColor
 * @property {string} color - Color as hex string (mandatory if index: -1)
 * @property {number} index - Index in palette
 */
