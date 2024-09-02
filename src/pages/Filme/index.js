import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme.css';
import api from '../../services/api';
import { toast } from "react-toastify";

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function LoadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "dbd37c97d13a1b17d5d483057c2735a3",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    console.log("Filme nao encontrado");
                    navigate("/", { replace: true })
                    return;
                })
        }

        LoadFilme();


        return () => {
            console.log("Componente foi Desmontado")
        }
    }, [navigate, id])


    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeFlix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)

        if (hasFilme) {
            toast.warn("Esse filme já está na sua Lista");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
        toast.success("Filme Salvo com Sucesso")
    }

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3 className="Sinopse">Sinopse</h3>
            <span id="sinopse">{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>

            <div className="area-buttons">
                <button className="salvar" onClick={salvarFilme}>Salvar</button>
                <button className="trailer">
                    <a target="blank" rel="external" className="trailer-label" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}

export default Filme;