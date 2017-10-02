export default function({ types: t }) {
  return {
    visitor: {
      ExportDefaultDeclaration(path) {
        let extensionIdentifier;
        try {
          extensionIdentifier = path.get([
            "declaration",                 // CallExpression
            "callee",                      // MemberExpression
            "object",                      // MemberExpression
            "property",                    // Identifier
            "name"                         // Route, Controller, Model etc
          ].join(".")).node;
        } catch(e) {
          console.log(fileName);
          console.log(e);
        } finally {
          const emberId = t.identifier("Ember");
          const extensionId = t.identifier(extensionIdentifier);
          const extensionProp = t.ObjectProperty(extensionId, extensionId, false, true, null); // true for shorthand
          const extensionObj = t.objectPattern([extensionProp]);
          const extensionDeclarator = t.variableDeclarator(extensionObj, emberId);
          const extensionDeclaration = t.variableDeclaration("const", [extensionDeclarator]);
          path.insertBefore(extensionDeclaration);

          const extendId = t.identifier("extend");
          const callee = t.memberExpression(extensionId, extendId);
          const originalCallee = path.get('declaration').get('callee');
          originalCallee.replaceWith(callee);
        }
      }
    }
  }
}
