class Corruption{
    constructor(name,amount,icon){
        this.name   = name;
        this.amount = amount;
        this.icon   = icon;
    }

    getName(){
        return this.name;
    }

    getAmount(){
        return this.amount;
    }

    getIcon(){
        return this.icon;
    }

    setName(name){
        this.name = name;
    }

    setAmount(amount){
        this.amount = amount;
    }

    setIcon(icon){
        this.icon = icon;
    }
}

module.exports = Corruption