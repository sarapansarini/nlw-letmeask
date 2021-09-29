import { Link, useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";

import illustrationImg from "../assets/images/illustration.svg"; // importar imagens para o react
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import { database } from "../services/firebase";

// todas as importações são feitas pelo js

import { Button } from "../components/Button";

import "../styles/auth.scss";
import { useAuth } from "../hooks/useAuth";
// import { userInfo } from "os";

export function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState("");
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }
    const roomRef = database.ref("rooms"); //referência para registro no banco de dados

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Logo Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar uma sala existente? <Link to="/">Clique aqui.</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
