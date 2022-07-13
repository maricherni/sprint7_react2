import React, { useState} from "react";
import {Panell, Option, Button, OptionsNumber} from "./Styled";

const App = () =>  {
//Array de opciones principales: web, seo y ads
  const [isChecked, setIsChecked] = useState({options: []})

//Imorte total del presupuesto
let [totalBudget, setTotalBudget] = useState(0);

//OPCIÓN WEB  
  //RENDERIZADO CONCIDIONAL para mostrar opciones secundarias de página web
  let [webPageOptions, setwebPageOptions] = useState(true); 
  //Array de opciones secundarias de web y contadores de páginas e idiomas
  let [addPages, setAddPages] = useState({otherPages: []}); 
  let [addLanguages, setAddLanguages] = useState({otherLanguages: []}); 
  const [qtyPages, setQtyPages] = useState(0);
  const [qtyLanguages, setQtyLanguages] = useState(0);

  //OPCIÓN WEB seleccionada.
  const showWebOptions = (e) => {
    const { name, checked } = e.target; //importamos las propiedades del checkbox y textbox

    //Muestra opciones adicionales si se selecciona 
    if (name === 'webPage'){
      setwebPageOptions(!webPageOptions); 
    } 
    //Si se quita selección de la casilla web, reinicia el array de opciones adicionales y se ponen los contadores a 0 
    if(!checked){
      setAddPages({
        otherPages: []
      })
      setAddLanguages({
        otherLanguages: []
      })
      setQtyPages(0)
      setQtyLanguages(0)
    }
    handleChange(e);
  }

//Función que se ejecuta al marcar "checkboxes" e introducir números de las opciones
const handleChange = (event) => {
  const { name, value, checked } = event.target; //importamos las propiedades del checkbox y textbox
  const {options} = isChecked; //importamos el array de isChecked
  const {otherPages} = addPages; //importamos el array de isChecked
  const {otherLanguages} = addLanguages; //importamos el array de isChecked
  
  // Si la casilla está marcada
  if (checked) {
    setIsChecked({
      options: [...options, {name, value}]
    });
  }
  // Si se desmarca la casilla (se filtra por nombre, porque si se filtra por valor se eliminarán todas las que tengan el mismo valor)
  else {
    const deleted = options.filter((option) => option.name !== name);
    setIsChecked({
       options: [...deleted]
    });
  }

 //OPCIONES WEB adicionales: páginas e idiomas
 switch (name) {
  // con botones
  case 'morePages':
    setQtyPages(parseInt(qtyPages) + 1);
    setAddPages({
        otherPages: [...otherPages, {value: (qtyPages + 1)  * 30}]
      });
    break;
  case 'lessPages':
    setQtyPages(parseInt(qtyPages) > 0 ? parseInt(qtyPages) - 1: parseInt(qtyPages));
    setAddPages({
      otherPages: [...otherPages, {value: ((qtyPages -1) > 0? (qtyPages -1) * 30: 0)}]
    });
    break;
  case 'moreLanguages':
    setQtyLanguages(parseInt(qtyLanguages) + 1);
    setAddLanguages({
      otherLanguages: [...otherLanguages, {value: (qtyLanguages + 1) * 30}]
      });
    break;
  case 'lessLanguages':
    setQtyLanguages(parseInt(qtyLanguages) > 0 ? parseInt(qtyLanguages) - 1: parseInt(qtyLanguages));
    setAddLanguages({
      otherLanguages: [...otherLanguages, {value: ((qtyLanguages -1) > 0? (qtyLanguages -1) * 30: 0)}]
      });
    break;
  //con texto escrito manualmente
  case 'qtyPages':
      setQtyPages(value);
      setAddPages({
        otherPages: [...otherPages, {value: value*30}]
      });
    break;
  case 'qtyLanguages':
    setQtyLanguages(value);
    setAddLanguages({
      otherLanguages: [...otherLanguages, {value: value*30}]
    });
    break;
    default: 
 }

  const lastSelectedOtherPages = otherPages.slice(otherPages.length -1);
  const lastSelectedOtherLanguages = otherLanguages.slice(otherLanguages.length -1);
  
  //Cálculo total: opciones principales y secundarias
  const totalMain = options.map(option => option.value).reduce((prev, current)=> parseInt(prev) + parseInt(current), 0);
  const totalOtherPages = lastSelectedOtherPages.map(option => option.value).reduce((prev, current)=> prev + current, 0);
  const totalOtherLanguages = lastSelectedOtherLanguages.map(option => option.value).reduce((prev, current)=> prev + current, 0);
  const budget = totalMain + totalOtherPages + totalOtherLanguages;
  
  setTotalBudget(budget);
  console.log(otherPages, lastSelectedOtherPages, 'last pages', otherLanguages, lastSelectedOtherLanguages, 'last languages');
}; 
  

return (
  <div>
    <p>Què vols fer?</p>
    <div>
        <div>
          <input
            type="checkbox"
            name="webPage"
            value= {500}
            id="webPage"
            onChange={showWebOptions}
          />
          <label htmlFor="webPage">
            Una pàgina web (500€)
          </label>
        </div>
        {!webPageOptions &&
        <div> 
          <Panell>
            <Option>
              <label htmlFor="qtyPages">
                Número de pàgines 
              </label>
                <OptionsNumber>
                <Button name = 'morePages' onClick={handleChange}>+</Button>
                <input 
                  type="text"
                  style={{border:'none', width:'3rem'}}
                  name="qtyPages"
                  id="qtyPages"
                  value={qtyPages}
                  onChange={handleChange}
                />
                <Button name="lessPages" onClick={handleChange}>-</Button>
                </OptionsNumber>
            </Option>
            
            <Option>
            <label htmlFor="qtyLanguages">
              Número d'idiòmes 
            </label>
              <OptionsNumber>
                <Button name = 'moreLanguages' onClick={handleChange}>+</Button>
                <input
                  type="text"
                  style={{border:'none', width:'3rem'}}
                  name="qtyLanguages"
                  id="qtyLanguages"
                  value={qtyLanguages}
                  onChange={handleChange}
                />
                <Button name = 'lessLanguages' onClick={handleChange}>-</Button>
              </OptionsNumber>
            </Option>
          </Panell>
        </div>
        }
        <div>
          <input 
            type="checkbox"
            name="seo"
            value= {300}
            id="seo"
            onChange={handleChange}
          />
          <label htmlFor="seo">
            Una consultoria SEO (300€)
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            name="googleAds"
            value= {200}
            id="googleAds"
            onChange={handleChange}
          />
          <label htmlFor="googleAds">
            Una campanya de Google Ads (200€)
          </label>
        </div>
    </div>
   
    <p>Preu:  {totalBudget} €</p>
   </div>
             
);
}

export default App;
