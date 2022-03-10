// Script function start
let convertSingleArratyToTree = ( mainData, singleObjData, orderedKey, index  ) => {
    let currentData = [];
    const prevIndex = index -1 ;
    const currentKey = orderedKey[ index ];

    var currentLblKey;

    let uniqueData = [];
    
    if( prevIndex < 0 ){
    currentData = mainData.filter( ( d ) => {
        if( d[currentKey] !== "" && d[currentKey] != "Unknown" && !uniqueData.includes( d[currentKey] ) ){
        uniqueData.push( d[currentKey] );
        return true;
        }
        return false;
        }
    );
    } else{
    const prevKey = orderedKey[ prevIndex ];
    currentData = mainData.filter( ( d) => {
        if(d[prevKey] == singleObjData[prevKey] && 
        d[currentKey] != "Unknown" && d[currentKey] != "Null" 
        && d[currentKey] !== "" &&
        !uniqueData.includes( d[currentKey] ) ){
        uniqueData.push( d[currentKey] );
        return true;
        }
        return false;
    });       
    }

    const nextIndex = index + 1;
    currentData = JSON.parse( JSON.stringify( currentData));
    if( currentData.length && nextIndex < orderedKey.length  ){
    let filteredData = []; 
    currentData.forEach( (loopData) => {
        let tmpArr = {
        root:  index == 0,
        checked: false,
        label: loopData[currentLblKey],
        children: [],
        type: currentKey,
        code: loopData[currentKey]
        }
        tmpArr['children'] = convertSingleArratyToTree( mainData, Object.assign({}, loopData), orderedKey, nextIndex);
        filteredData.push( Object.assign( {},tmpArr ) ) ;
    });
    return JSON.parse( JSON.stringify( filteredData ) );
    }
    return currentData.map( ( d) => {
    let tmpArr = {
        checked: false,
        label: d[currentLblKey],
        type: currentKey,
        code: d[currentKey]
    }
    return tmpArr;
    });

}
  
// Script function END

// MAKE a tree in order of this array
    let orderedKey = [
        'Country',
        'State',
        'City'
    ];

// Single Dimension Data Array List
    let areasList = [
        {
            Country: 'India',
            State: '',
            City: ''
        },
        {
            Country: 'India',
            State: 'Maharashtra',
            City: ''
        },
        {
            Country: 'India',
            State: 'Maharashtra',
            City: 'Mumbai'
        },
        {
            Country: 'India',
            State: 'Maharashtra',
            City: 'Pune'
        },
        {
            Country: 'India',
            State: 'Goa',
            City: ''
        },
        {
            Country: 'India',
            State: 'Goa',
            City: 'Goa'
        }
    ]

// Get a tree View Data 
let treeData = convertSingleArratyToTree( areasList, [], orderedKey, 0)[0];
console.log( treeData );

// RESULT:
/**
 * - INDIA
 *      - Maharashtra
 *          - Pune
 *          - Mumbai
 *      - Goa
 *          - Goa   
 */
