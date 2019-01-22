# Scripting
Die Funktionen reduce, filter, sort und map können direkt auf Array angewendet werden.
Hier werden nun einige nützliche Anwendungen gezeigt.

```javascript
    // Initial Array 
    let array = [1,2,3,4,5];
    let stringArray = ["Has", "following", "server", "name", ":", "sys-srv01"];
```
## Anwendungen mit filter
### Funktionen: even / odd
Es resultiert ein Array mit allen ungeraden Zahlen.
Even wice versa.
```javascript
    const odd = elm => elm % 2 !== 0;
    const even = !odd;
    
    let result = array.filter(odd);
    // Result: [1, 3, 5]
```
### Funktion: divides
Es resultiert ein Array mit allen durch div teilbaren Zahlen.
```javascript
    const divides = div => elm => elm % div == 0;

    let result = array.filter(divides(3));
    // Result: [3]
```
### Funktion: match
Es resultiert ein Array, welches nur jene Elemente enthält, die dem Pattern entsprechen.
```javascript
    const match = pattr => elm => pattr.test(elm);

    let result = stringArray.filter(match(/sys-[a-z0-9]/));
    // Result: ["sys-srv01"]
```

### Anwendungen mit reduce
### Funktionen: plus / mult
Mit plus werden die einzelnen Elemente des Arrays aufsummiert.
Mit mult werden die einzelnen Elemente des Arrays aufmultipliziert.
```javascript
    const plus = (accu, val) => val + accu;
    const mult = (accu, val) => val * accu;
    
    let result = array.reduce(plus);
    // Result: 15
```
### Funktion: avg
Berechnet den Durchschnitt über allen im Array befindlichen Werte.
```javascript
    const avg = (accu, val, curId, arr) => { 
        accu += val;
        return curId === arr.length - 1 ? accu / arr.length : accu
    };

    let result = array.reduce(avg);
    // Result: 5
```

### Funktionen: max / min
Mit max wird das Maximum aus dem Array herausgefiltert.
Mit min wird das Minimum aus dem Array herausgefiltert.
```javascript
    const max = (accu, val) => val > accu ? val : accu;
    const min = (accu, val) => val < accu ? val : accu;
    
    let result1 = array.reduce(max, Number.MIN_VALUE);
    // Result: 5
    
    let result2 = array.reduce(min, Number.MAX_VALUE);
    // Result: 1
```

### Funktion: distinct
Entfernt Dublikate aus einem Array.
```javascript
    let dupArray = [1, 2, 3, 2, 4, 5];

    const distinct = (accu, val, curId, arr) => {
        if (accu.indexOf(val) === -1){
            accu[accu.length] = val;
        }
        return accu;
    };
    
    let result = dupArray.reduce(distinct, []);
    // Result: [1,2,3,4,5]
```

### Funktion: join
Konkatenation der einzelnen Elemente mit dem Trennzeichen deli.
```javascript
    const join = deli => (accu, val) => accu + deli + val;
    let result = array.reduce(join("-"));
    // Result: 1-2-3
```
### Funktion: preOrder
Ordnet das Array in umgekehrter Reihenfolge.
```javascript
    const preOrder = (accu, val, curId, arr) => {accu[curId] = arr[(arr.length - 1) - curId]; return accu};

    let result = array.reduce(preOrder, []);
    // Result: [5, 4, 3, 2, 1]
```

### Function: toIndexOfMatch
Es resultiert ein Array, das jene Index enthält, welche eine Übereinstimmung an einem gleichem Index haben.

Kann zum Beispiel im Zusammenspiel mit toByteArray verwendet werden.
```javascript
    let byteArray1 = [false,  true, false,  true, false];
    let byteArray2 = [false, false, false, false, true ];
    const toIndexOfMatch = arr1 => (accu, elm, curId, arr2) => {
        if (arr1[curId] === elm){
            accu[accu.length] = curId;
        }
        return accu;
    };
    
    let result = byteArray1.reduce(toIndexOfMatch(byteArray2), []);
    // Result: [0, 2, 3]
```

### Funktion: toMap
Erstellt eine Map aus einem Array von Objekten.

```javascript
    let objectArray = [
      {id: "ironman", name: "Tony"},
      {id: "cap", name: "Steve"}
    ];
    const toMap = idField => (accu, elm, curId, arr2) => { accu[elm[idField]] = elm; return accu }

    let result = objectArray.reduce(toMap("id"), {});
    // Result: { ironman: {id: "ironman", name: "Tony"}, cap: {id: "cap", name: "Steve"} }
```

## Anwendungen mit map
### Funktion: toByteArray
Erstellt mittels einer boolschen Funktion ein boolean Array.
```javascript
    const even = elm => elm % 2 === 0;
    
    const toByteArray = boolFun => elm => boolFun(elm);
    
    let result = array.map(toByteArray(even));
    // Result: [false,  true, false,  true, false]
```

## Anwendungen mit sort
Dieser Abschnitt enthält diverse sort Vergleichs- und Hilfsfunktionen.

### Funktion: numComp
```javascript
    const numComp = (elm1, elm2) =>  elm1 - elm2;
    
    let result = array.sort(numComp);
    // Result: [1,2,3,4,5]
```

### Funktion: alphaNumComp
```javascript
    let alphaNumArray = ["acf", "abc", "ade", "abd"];
    
    const alphaNumComp = (elm1, elm2) =>  elm2.localeCompare(elm1);
    
    let result = alphaNumArray.sort(alphaNumComp);
    // Result: [ "ade", "acf", "abd", "abc" ]
```

### Funktion: objectSort
```javascript
     let objectArray = [
         {id: 2, name: "Tony"},
         {id: 3, name: "Tony"},
         {id: 1, name: "Steve"}
     ];
     const numComp = (elm1, elm2) =>  elm1 - elm2;
     
     const objectSort = field => comprFun => (elm1, elm2) => comprFun(elm1[field], elm2[field]);
     
     objectArray.sort(objectSort("id")(numComp));
    // Result: [ { id: 1, name: "Steve" }, { id: 2, name: "Tony" }, { id: 3, name: "Tony" } ]
```

