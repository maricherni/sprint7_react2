import React from "react";
import { useState, useEffect } from "react";
import {Panell, Button, Option, OptionsNumber, GlobalStyle} from './Styled'


function Budget () {
    //Array de objetos con opciones principales: web, seo y ads 
        //Para que se mantenga el input del cliente al actualizar la pantalla hay que hacer getItem en LocalStorage (hago condicional para que salga a 0 por defecto o con el input en caso de que haya)
    const [isChecked, setIsChecked] = useState(
        localStorage.getItem('checked') 
        ? JSON.parse(localStorage.getItem('checked'))
        :{
            web: 0,
            seo: 0, 
            ads: 0
        })
    
    //Contadores de páginas e idiomas 
    const [qtyPages, setQtyPages] = useState(localStorage.getItem('pages') ? (localStorage.getItem('pages')) : 0);
    const [qtyLanguages, setQtyLanguages] = useState(localStorage.getItem('languages') ? (localStorage.getItem('languages')) : 0); 
    
    let totalAdditional = qtyPages * qtyLanguages * 30;
    
    if(!isChecked.web){
        totalAdditional = 0;
    }
    
    //Almacenar el input del cliente en Local Storage
    useEffect(()=>{
        try{
         setIsChecked(isChecked)
         setQtyPages(qtyPages)
         setQtyLanguages(qtyLanguages)
         localStorage.setItem('pages', qtyPages)
         localStorage.setItem('languages', qtyLanguages)
         localStorage.setItem('checked', JSON.stringify(isChecked))
        } catch (error){
            console.error(error)
        }
    },[qtyPages, qtyLanguages, isChecked])

    //Importe total del presupuesto
    const totalBudget = isChecked.web + totalAdditional + isChecked.seo + isChecked.ads; 

    return(
    <div>
        <p>¿Qué quieres hacer?</p>
        <div>
            {/* WEB */}
            <div>
                <input
                    type="checkbox"
                    checked={Boolean(isChecked.web)} // Si el valor es 0, -0, null, false, NaN, undefined o (""), el valor será false. Con el resto de valores, incluídos objetos, [] o el string 'false', el valor será true.
                    onChange={(e) => e.target.checked
                        ?setIsChecked({...isChecked, web: isChecked.web +500})
                        :setIsChecked({...isChecked, web: isChecked.web -500})
                    }
                />
                <label htmlFor="webPage">
                    Una página web (500€)
                </label>
            {Boolean(isChecked.web) &&
                <div> 
                    <Panell>
                    <div>
                        <Option>
                            <label htmlFor="qtyPages">
                                Número de páginas 
                            </label>
                            <OptionsNumber>
                                <Button name="morePages" onClick={()=>setQtyPages(parseInt(qtyPages)+1)}>+</Button> {/*ParseInt evita que si empieza escribiendo y decide darle al botón se sume en modo número y no en modo string (añadiendo un 1) */}
                                <input 
                                type="number"
                                name="qtyPages"
                                style={{border:'none', width:'3rem'}} 
                                value={qtyPages}
                                onChange={(e)=>setQtyPages(e.target.value)}
                                />
                                <Button name="lessPages" onClick={()=>setQtyPages(qtyPages > 0 ? qtyPages - 1: qtyPages)}>-</Button>
                            </OptionsNumber>
                        </Option>
                        <Option>
                            <label htmlFor="qtyLanguages">
                                Número de idiomas 
                            </label>
                            <OptionsNumber>
                                <Button name="moreLanguages" onClick={()=>setQtyLanguages(parseInt(qtyLanguages)+1)}>+</Button>
                                <input
                                type="number"
                                name="qtyLanguages"
                                style={{border:'none', width:'3rem'}}
                                value={(qtyLanguages)}
                                onChange={(e)=>setQtyLanguages(e.target.value)}
                                />
                                <Button name="lessLanguages" onClick={()=>setQtyLanguages(qtyLanguages > 0 ? qtyLanguages - 1: qtyLanguages)}>-</Button>
                            </OptionsNumber>
                        </Option>
                    </div>
                    </Panell>
                </div>
            }
            </div>
            {/* SEO */}
            <div>
                <input
                    type="checkbox"
                    checked={Boolean(isChecked.seo)} 
                    onChange={(e) => e.target.checked
                        ?setIsChecked({...isChecked, seo: isChecked.seo +300})
                        :setIsChecked({...isChecked, seo: isChecked.seo -300})
                    }
                />
                <label htmlFor="seo">
                    Una consultoría SEO (300€)
                </label>
            </div>
            {/* ADS */}
            <div>
                <input
                    type="checkbox"
                    checked={Boolean(isChecked.ads)} 
                    onChange={(e) => e.target.checked
                        ?setIsChecked({...isChecked, ads: isChecked.ads +200})
                        :setIsChecked({...isChecked, ads: isChecked.ads -200})
                    }
                />
                <label htmlFor="ads">
                    Una campaña de Google Ads (200€)
                </label>
            </div>
        </div>
        <p>Precio: {totalBudget} €</p>
    </div>  
    
    )
}

export default Budget;