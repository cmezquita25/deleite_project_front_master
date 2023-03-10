import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { Call } from "../../../../helpers/calls/Call"
let oCall = new Call();
interface ProductoImagenes {
    base64?: string
}
var cont = 0;
let ingreselectPesonalizado: string[] = [];
interface ProductoDatos {
    base64Origihal?: string,
    tipo?:string,
    nombreP?: string,
    descripcionP?: string,
    precio?:string,
    categoria?:string,
    tematica?:string,
    popular?: boolean,
    saludable?: boolean,
    ingredienteselect?: string,

}
var imagenPrincipal = "";
const DetalleProducto = defineComponent({
    data() {
        return {
            id: Object as any,
            productoImagenes: [] as ProductoImagenes[],
            productoDatos: [] as ProductoDatos,
            ingre: [] as any,
            selccionIngredientes: [] as string[],
           

        }
    },



    methods:{
         deleteInput(index: any, button: HTMLButtonElement) {
            ingreselectPesonalizado.splice(index, 100); // Elimina el elemento en el índice encontrado
            const wrapper = button.parentElement;

            if (wrapper) {
                wrapper.remove();
              } else {
                alert("Error");
              }
            console.log(this.selccionIngredientes);
          },
        agregraIngrediente(ingrediente:any){
            //this.selccionIngredientes.push(ingrediente);
            ingreselectPesonalizado.push(ingrediente);
            //console.log(this.selccionIngredientes);
            
            //console.log(mensajeIngredientes);
        
            
            const ingre = document.getElementById('seleccioningredientes');
            const boton = document.createElement('button');
            boton.type = 'button';
            boton.textContent = ingrediente + '      X';
            boton.className = 'btn btn-cruds'
            const index = ingreselectPesonalizado.indexOf(ingrediente);
            boton.addEventListener('click', () =>{
                this.deleteInput(index, boton);
            })
            const wrapper = document.createElement('div');
            wrapper.appendChild(boton);
            ingre?.appendChild(wrapper);
        },
        mensaje(){
            const button = document.getElementById('whatsapp-button') as HTMLElement;
            if (button) {
                button.addEventListener('click', (event) => {{this.productoDatos.precio}
                  event.preventDefault();
                  const mensajeIngredientes = ingreselectPesonalizado.length > 0 ? ingreselectPesonalizado.join(', ') : this.productoDatos.ingredienteselect;
                  const myArray = ingreselectPesonalizado;
                  //const mensajeIngredientes = ingreselectPesonalizado[0].split(/\s*,\s*/);
                  const telefono = '9995901375'; // reemplazar con el número de teléfono de tu empresa
                  const mensaje = `¡Hola! Estoy interesado en el producto ${this.productoDatos.nombreP}, con el precio de ${this.productoDatos.precio}, de la categoria "${this.productoDatos.categoria}", y la tematica "${this.productoDatos.tematica} " con los siguientes ingredientes: ${mensajeIngredientes}`; // reemplazar con el mensaje que quieras enviar
                  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
                  window.open(url, '_blank');
                });
              }
        },
        async crearCategoria() {

            oCall.cenisFetch('GET', `api/Producto/getimages/${this.id}`, "", "")
              .then(async (response) => {
                //console.log(response.Data.$values);
                this.productoImagenes = response.Data.$values;
                this.productoDatos = response.Data.$values[1];
                if(this.productoDatos.ingredienteselect !==null){
                    this.ingre = this.productoDatos.ingredienteselect?.split(/\s*,\s*/);
                    
                    //.log(this.ingre[0])
                }else{
                    this.ingre = [] 
                }

                //console.log(this.productoDatos.precio);
                //console.log(response.Data.$values[1].nombreP);
                //imagenPrincipal = response.Data.$values[1].base64Origihal;
                //console.log("jhghjghjghjghj"+this.tematicas)
                  /*  this.tematicas.map((item)=>{
                        console.log("foreach  " +  item.nombreP )
                    });*/
                })
              .catch((error) => {
                console.error('Ha ocurrido un error al crear una nueva categoría:', error);
              });
          }

    },
     
    mounted() {
        this.id = this.$route.params.id;
        this.crearCategoria()
    },
    render() {
        return (
            <>
                <div>
                    <div class="ContainerDetalles">
                        <div class="DetallesChild">

                            <div>
                            
                                <div class="alert alert-deleite" role="alert">
                                    Temática: <span>{this.productoDatos.tematica}</span>
                                    {this.$route.query.id}
                                </div>
                                <div class="alert recomendado" role="alert">
                                {this.productoDatos.popular ? <h3>¡De nuestros productos más vendidos!</h3> : <h3>¡De nuestros productos por conocer!</h3>}
                                </div>
                            </div>
                            &nbsp;
                            <div>
                                <h2 class="display-4">{this.productoDatos.nombreP}</h2>
                            </div>
                            &nbsp;

                            <div>
                                <div>


                                <div class="container-fluid p-0">
                                            <div class="row g-0">
                                           {this.productoImagenes.map((item)=>{
                                            return (
                                          
                                            <div class="col-lg-4 col-sm-6">
                                            <a href="#" data-bs-toggle="modal" data-bs-target={`#modalImage2${cont++}`}>
                                                <img src={`data:image/png;base64,${item.base64}`} height="600" width="600" class="img-min item"/>
                                            </a>
                                            
                                            <div tabindex="-1" aria-labelledby="modalImage1" arial-hidden="true" class="modal fade" id={`modalImage2${cont++ -1}`}>
                                            <div class="modal-dialog modal-lg modal-dialog-center">
                                                <div class="modal-content">
                                                    <center>
                                                    <img height="600" width="600" src={`data:image/png;base64,${item.base64}`} />
                                                    </center>
                                                </div>
                                            </div>
                                        </div>
                                            
                                            </div>
                                            

                                           
                                            )

                                           })}
                                            

                                           </div>
                                            </div>
                                            <div class="row g-0 d-flex justify-content-center">
                                        <a href="#" data-bs-toggle="modal" data-bs-target={`#modalImage1`}>
                                            <img src={`data:image/png;base64,${this.productoDatos.base64Origihal}`} class="img-min2 item" />
                                        </a>
                                    </div>
                                      

                                   
                                    
                                    &nbsp;

                                    <div>
                                        <h2>${this.productoDatos.precio}</h2>
                                    </div>

                                    &nbsp;
                                    <div class="row g-0">
                                        <div>
                                            <h6>Selecciona los ingredientes que desee:</h6>
                                        </div>

                                        <div class="ingredientes">
                                            {this.ingre.map((item:any)=>{
                                                return(
                                                    <button onClick={() => this.agregraIngrediente(item)} id="crear-inpust" type="button" class="btn btn-cruds">{item}</button>
                                                ) 
                                            })}
                                            <div id="seleccioningredientes">

                                            </div>
                                            <h6>usted ha seleccionado los siguientes ingredientes</h6>
                                            {this.selccionIngredientes.map((item: any)=>{
                                                <button onClick={() => this.agregraIngrediente(item)} id="crear-inpust" type="button" class="btn btn-cruds">{item}</button>
                                                
                                            })}

                                        </div>
                                        &nbsp;
                                        <div class="ingredientes">
                                            <h6>Este producto es:</h6>
                                        </div>

                                        <div class="ingredientes">
                                            {this.productoDatos.saludable ? <h5><span class="badge bg-tipo">Sin azucar</span></h5>: <h5><span class="badge bg-tipo2">Con azúcar</span></h5>}
                                            &nbsp;
                                            
                                        </div>

                                    </div>

                                    <div class="row g-0 descripcionProducto">
                                        <div class="descripcionProducto2">
                                            <p>
                                                
                                            </p>
                                        </div>
                                    </div>



                                    <div>
                                        <a><router-link class="btn btn-cruds" to="/contacto">¡Lo quiero!</router-link></a>
                                        <button onClick={this.mensaje} class="btn btn-cruds" id="whatsapp-button">Contactar por WhatsApp</button>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div tabindex="-1" aria-labelledby="modalImage1" arial-hidden="true" class="modal fade" id="modalImage1">
                    <div class="modal-dialog modal-lg modal-dialog-center">
                        <div class="modal-content">
                            <img src={`data:image/png;base64,${this.productoDatos.base64Origihal}`}  />
                        </div>
                    </div>
                </div>


            </>



        )

    }

})

export default DetalleProducto

