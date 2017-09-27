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
          ].join("."));
        } catch(e) {
          console.log(fileName);
          console.log(e);
        } finally {
          const extension = `const { ${extensionIdentifier} } = Ember;`
          // insert above ^ after importDeclaration
        }
      }
    }
  }
}
