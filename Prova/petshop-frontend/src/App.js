import axios from "axios";
import React from "react";

function cabecalho() { 
  return (
    <p>Bem vindo ao sistema</p>
  );
}


class ListaPet extends React.Component { 
  state = { 
      petAtual : {
      id : "",
      nome : "",
      nacimento : "",
      peso : ""
    },
    
    lista: [
    ],
  }

  inputChange(campo, novoTexto) { 
    const novoState = {...this.state};
    novoState.petAtual[campo] = novoTexto;
    this.setState(novoState);
  }

  adicionar() { 
    const apiUrl = `http://localhost:8080/animal/add`;
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            Accept: 'text/plain',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.petAtual)
        }).then(
          (response)=> {
            console.log(response.body);
            this.carregarPets();
          }
        );
  }

  render() { 
    const displayLista = [];

    for (let i = 0; i < this.state.lista.length; i++) { 
      displayLista.push(
        <tr key={i}>
          <td>{this.state.lista[i].id}</td>
          <td>{this.state.lista[i].nome}</td>
          <td>{this.state.lista[i].nascimento}</td>
          <td>{this.state.lista[i].peso}</td>
        </tr>);
    }    

    return (
      <div>
        <p>Gestão de Animais</p>
        <div className="form-group">
          <label>Id: </label>
          <input  type="TEXT" value={this.state.petAtual.id}
                  className="form-control"
                  onChange={(novoTexto)=>{this.inputChange('id', novoTexto.target.value)}}/>
          
        </div>
        <div className="form-group">
          <label>Nome: </label>
          <input  type="TEXT" value={this.state.petAtual.nome} 
                  className="form-control"
                  onChange={(novoTexto)=>{this.inputChange('nome', novoTexto.target.value)}}/>
        </div>
        <div className="form-group">
          <label>Nascimento: </label>
          <input  type="TEXT" value={this.state.petAtual.nascimento} 
                  className="form-control"
                  onChange={(novoTexto)=>{this.inputChange('nascimento', novoTexto.target.value)}}/>                           
        </div>
        <div className="form-group">
          <label>Peso: </label>
          <input  type="TEXT" value={this.state.petAtual.peso} 
                  className="form-control"
                  onChange={(novoTexto)=>{this.inputChange('peso', novoTexto.target.value)}}/>                           
        </div>
        <button className="btn btn-primary" onClick={()=>{this.adicionar()}}>Adicionar</button>
        <button className="btn btn-primary" onClick={() => {this.carregarPets()}}>Pesquisar</button>
        <table className="table table-striped" >
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Nascimento</th>
              <th>Peso</th>
            </tr>
          </thead>
          <tbody>
            {displayLista}
          </tbody>
        </table>
      </div>
    );
  }

  carregarPets() { 
    const novoState = {...this.state};
    axios.get(
      `http://localhost:8080/animal/${novoState.petAtual.nome}`,
        {
          responseType: 'json',
        }
      ).then(
      (response) => {
        const novoState = {...this.state};
        novoState.lista = response.data;
        this.setState(novoState);
      }
    );
    console.log("Animais carregados pelo nome!");
  }
}

function retornaPagina() { 
  return (
    <div className="container">
      {cabecalho()}
      <ListaPet/>
    </div>
  );
}

export default retornaPagina;

