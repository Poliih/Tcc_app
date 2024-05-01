import React, { useState } from 'react';
import './App.css';
import './components/Button/Button1.css';
import './components/Rectangle2/Rectangle2.css';
import './components/menu/MenuComponent.css';
import MenuComponent from './components/menu/menu'; // Corrigido o nome do arquivo
import Button1 from './components/Button/Button1';
import Rectangle2 from './components/Rectangle2/Rectangle2'; 
import './components/Rectangle3/Rectangle3';


function App() {
  // Array com os itens da lista
  
  const items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5'
  ];

  // Estado para armazenar o item selecionado e a imagem selecionada
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Função para lidar com a seleção de itens
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false); // Fecha a lista suspensa após a seleção do item
  };

  // Função para lidar com a seleção de imagens
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  // Função para lidar com a seleção de arquivo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Função para lidar com o envio do formulário (opcional)
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode enviar a imagem e o arquivo selecionados para o servidor ou realizar qualquer outra ação necessária
    console.log("Item selecionado:", selectedItem);
    console.log("Imagem selecionada:", selectedImage);
    console.log("Arquivo selecionado:", selectedFile);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Alterna o estado da lista suspensa ao clicar na caixa
  };

  return (
    <div className={`container ${isOpen ? 'menu-open' : ''}`}>

      <div className="centered">
        <MenuComponent /> {/* Removido o envio do estado `menuAberto` */}
        <div className={`content ${isOpen ? 'menu-aberto' : ''}`}>
          
        <div className="centered">
      <MenuComponent />
          <div className={`content ${isOpen ? 'menu-aberto' : ''}`}>
            <div className="rectangle-container">
              <div className="Rectangle3Componete"></div>
              <div className="Rectangle3Componete"></div>
              <div className="Rectangle3Componete"></div>
            </div>
            <Button1 title="Teste Babys" />
            <Rectangle2 />
            {/* Restante do conteúdo */}
          </div>
        </div>

          <Button1 title="Teste Babys" />
          <Rectangle2 />
        
          <form onSubmit={handleSubmit}>
            <div className="custom-dropdown">
              <div className="selected-item" onClick={toggleDropdown}>{selectedItem || 'Select'}</div>
              {isOpen && (
                <ul className="dropdown-list">
                  {items.map((item, index) => (
                    <li key={index} onClick={() => handleItemClick(item)}>{item}</li>
                  ))}
                </ul>
              )}
            </div>

          
            <div>
              <label htmlFor="name">Nome:</label>
              <input type="text" id="name" name="name" />
            </div>

            <div>
              <label htmlFor="message">Mensagem:</label>
              <textarea id="message" name="message" rows="4" cols="50"></textarea>
            </div>

            <button type="submit">Enviar</button>
          
            <div className="image-upload">
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {selectedImage && (
                <img src={URL.createObjectURL(selectedImage)} alt="Imagem selecionada" />
              )}
            </div>

            {/* Campo para enviar arquivo */}
            <div>
              <label htmlFor="file">Enviar arquivo:</label>
              <input type="file" id="file" name="file" accept=".txt,.pdf,.doc,.docx" onChange={handleFileChange} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
