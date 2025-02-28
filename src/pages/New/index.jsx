import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiUserPlus, FiSave, FiTrash2 } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import "./new.css";

export default function NewSupplier() {
  const { id } = useParams(); // Para pegar o id do fornecedor na URL
  const [supplierData, setSupplierData] = useState({
    nome: "",
    estado: "",
    custo_kwh: "",
    limite_min_kwh: "",
    num_clientes: "",
    avaliacao: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Controlar carregamento
  const navigate = useNavigate(); // Para redirecionar após salvar/editar

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      async function fetchSupplier() {
        try {
          const response = await fetch(`https://clackback-production.up.railway.app/new/${id}`);
          const data = await response.json();
          setSupplierData(data);
        } catch (error) {
          toast.error("Erro ao carregar fornecedor.");
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }

      fetchSupplier();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Função para salvar o fornecedor
  const handleSave = async () => {

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const method = id ? "PUT" : "POST"; 
      const url = id
        ? `https://clackback-production.up.railway.app/new/${id}` 
        : "https://clackback-production.up.railway.app/new"; 

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supplierData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Fornecedor salvo com sucesso!");
        navigate("/consultas"); 
      } else {
        toast.error("Erro ao salvar fornecedor.");
      }
    } catch (error) {
      console.error("Erro ao salvar fornecedor:", error);
      toast.error("Erro na comunicação com o servidor,tente novamente.");
    } finally {
      setIsLoading(false);
    }

  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este fornecedor?")) {
      try {
        setIsLoading(true);
        const response = await fetch(`https://clackback-production.up.railway.app/new/${id}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          toast.success("Fornecedor excluído com sucesso!");
          navigate("/consultas"); 
        } else {
          toast.error("Erro ao excluir fornecedor.");
        }
      } catch (error) {
        console.error("Erro ao excluir fornecedor:", error);
        toast.error("Erro na comunicação com o servidor.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const validateForm = () => {
    if (!supplierData.nome.trim()) {
      toast.error("O campo Nome é obrigatório.");
      return false;
    }
    if (!supplierData.estado.trim()) {
      toast.error("O campo Estado é obrigatório.");
      return false;
    }
    if (supplierData.custo_kwh <= 0 || isNaN(supplierData.custo_kwh)) {
      toast.error("O custo kW/h deve ser um número válido maior que zero.");
      return false;
    }
    if (supplierData.limite_min_kwh <= 1 || isNaN(supplierData.limite_min_kwh)) {
      toast.error("O limite mínimo deve ser um número válido.");
      return false;
    }
    if (supplierData.num_clientes <= 0 || isNaN(supplierData.num_clientes)) {
      toast.error("O número de clientes deve ser um número válido.");
      return false;
    }
    if (supplierData.avaliacao <= 0 || supplierData.avaliacao > 5 || isNaN(supplierData.avaliacao)) {
      toast.error("A avaliação deve estar entre 0.1 e 5.");
      return false;
    }
    return true;
  };
  

  return (
    <div>
      <Header />
      <div className="content">
        <Title name={id ? "Editar Fornecedor" : "Cadastro de Fornecedor"}>
          <FiUserPlus size={25} />
        </Title>
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="supplier-card">
          <div className="supplier-header">
            <FiUserPlus size={50} />
            <h2>{id ? "Editar Fornecedor" : "Novo Fornecedor"}</h2>
          </div>

          <div className="supplier-info">
            <div className="input-group">
              <label>Nome:</label>
              <input
                type="text"
                name="nome"
                value={supplierData.nome}
                onChange={handleChange}
                disabled={isLoading} 
              />
            </div>

            <div className="input-group">
              <label>Estado:</label>
              <input
                type="text"
                name="estado"
                value={supplierData.estado}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="input-group">
              <label>Custo kW/h:</label>
              <input
                type="number"
                name="custo_kwh"
                value={supplierData.custo_kwh}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="input-group">
              <label>Limite Mínimo kW/h:</label>
              <input
                type="number"
                name="limite_min_kwh"
                value={supplierData.limite_min_kwh}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="input-group">
              <label>Número de Clientes:</label>
              <input
                type="number"
                name="num_clientes"
                value={supplierData.num_clientes}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="input-group">
              <label>Avaliação:</label>
              <input
                type="number"
                step="0.1"
                name="avaliacao"
                value={supplierData.avaliacao}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="supplier-actions">

          {id && (
              <button
                className="btn-delete"
                onClick={handleDelete}
                disabled={isLoading}
              >
                Excluir Fornecedor <FiTrash2 size={20} />
              </button>
            )}

            <button
              className="btn-save"
              onClick={handleSave}
              disabled={isLoading} 
            >
              {isLoading ? "Salvando..." : id ? "Salvar Edição" : "Salvar Novo"}
              <FiSave size={20} />
            </button>

            
          </div>
        </div>
      </div>
    </div>
  );
}
