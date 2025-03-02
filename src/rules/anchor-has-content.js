/**
 * @fileoverview Enforce anchor elements to contain accessible content.
 * @author Lisa Ring & Niklas Holmberg
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { elementType } from 'jsx-ast-utils';
import { arraySchema, generateObjSchema } from '../util/schemas';
import hasAccessibleChild from '../util/hasAccessibleChild';

const errorMessage = 'Anchors must have content and the content must be accessible by a screen reader.';

const schema = generateObjSchema({ components: arraySchema });

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/anchor-has-content.md',
      description: 'Enforce all anchors to contain accessible content.',
    },
    schema: [schema],
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      const options = context.options[0] || {};
      const componentOptions = options.components || [];
      const typeCheck = ['a'].concat(componentOptions);
      const nodeType = elementType(node);

      // Only check anchor elements and custom types.
      if (typeCheck.indexOf(nodeType) === -1) {
        return;
      }
      if (hasAccessibleChild(node.parent)) {
        return;
      }

      context.report({
        node,
        message: errorMessage,
      });
    },
  }),
};
