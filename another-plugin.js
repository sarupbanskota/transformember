const options = JSON.parse(process.argv[5].replace(/index=/g,''));
const fileName = options.fileName;
const removablePropName = options.removablePropName;
const removableValueName = options.removableValueName;

export default function({ types: t }) {
  return {
    visitor: {
      ObjectExpression(path) {
        let propIdentifier, propName, valueName;
        try {
          propIdentifier = path.get("properties")[0];
          propName = propIdentifier.node.key.name;
          valueName = propIdentifier.node.value.callee.name;
        } catch(e) {
          console.log(fileName);
          console.log(e);
        } finally {
          console.log(propName);
          console.log(valueName);
          if (propName === removablePropName && valueName === removableValueName) {
            propIdentifier.remove();
          }
        }
      }
    }
  }
}
