/**
 * @fileoverview Enforce html element has lang prop.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { elementType, getProp, getPropValue } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';

const errorMessage = '<html> elements must have the lang prop.';

const schema = generateObjSchema();

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/html-has-lang.md',
      description: 'Enforce `<html>` element has `lang` prop.',
    },
    schema: [schema],
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      const type = elementType(node);

      if (type && type !== 'html') {
        return;
      }

      const lang = getPropValue(getProp(node.attributes, 'lang'));

      if (lang) {
        return;
      }

      context.report({
        node,
        message: errorMessage,
      });
    },
  }),
};
