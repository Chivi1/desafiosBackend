class TicketManager {
    #priceRevenue = 1.15;
    constructor (){
        this.events = [];
    }
    getEventos = ()=>{
        return this.events;
    }

    addEvent = (name, place, price, capacity = 50, date = new Date().toLocaleDateString())=> {
        const event = {
            name,
            place,
            price: price*this.#priceRevenue,
            capacity,
            date,
            participantes: []
        }
        if(this.events.length ===0){
            event.id = 1;
        }
        else {
            event. id = this.events[this.events.length-1].id+1;
        }
        this.events.push(event);
    }
}

