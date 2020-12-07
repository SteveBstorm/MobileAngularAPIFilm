export class Map {
    private list : kvp[]
    constructor() {
         this.list = []
    }

    add(key : string, value : object){
        this.list.push({ key : key, value : value})
    }

    get(key : string) : object {
        return this.list.find(x => x.key == key).value
    }
}

export class kvp {
    key : string
    value : object
}