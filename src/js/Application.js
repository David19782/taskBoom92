import EventEmitter from "eventemitter3";
import Card from "./Card";
import Notification from "./Notification";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();

    const pizzas = [
      {
        type: Card.types.HAWAIIAN,
        price: 8.99,
      },
      {
        type: Card.types.PEPPERONI,
        price: 9.99,
      },
      {
        type: Card.types.MARGHERITA,
        price: 7.99,
      },
    ];

    pizzas.forEach((pizza) => {
      const card = new Card({ ...pizza });
      card.render();

      document.querySelector(".main").appendChild(card.container);
    });

    document.querySelector(".main").addEventListener('click', (e) => {
      if(e.target.classList.contains("card") || e.target.classList.contains("emoji") || e.target.classList.contains("type")){

      }else{
        return
      }
      let el;
      if(e.target.classList.contains("card")){
        el = e.target;
      }else{
        el = e.target.parentElement
      }
      const not = new Notification();
      const name = el.classList[1].substring(5);
      const curr = pizzas.find(el => el.type === name);
      console.log(curr);
      not.render(curr);
      
    })
    document.querySelector('.notifications').addEventListener('click', (e) => {
      if(e.target.classList.contains("delete")){
        e.target.parentElement.style.display = "none"
      }
    })

    this.emit(Application.events.READY);
  }
}
