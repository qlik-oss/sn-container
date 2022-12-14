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
    // default child list definition
    qChildListDef: {
      qData: {
        visualization: '/visualization',
        containerChildId: '/containerChildId',
        qExtendsId: '/qExtendsId',
        title: '/title',
        showCondition: '/showCondition',
      },
    },
  };

  return definition;
};

export default objectDefinition;
