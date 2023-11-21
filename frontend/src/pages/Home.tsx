import Body from "../components/Body";

function Home() {
  return (
    <Body>
      <div className="h-[calc(100vh-73px-20px-16px-20px)] flex flex-col justify-around">
        <h1 className="text-3xl font-extrabold ">SEJA BEM-VINDO</h1>
        <p className="text-2xl font-extralight ">Nossa Home page está em construção!!!</p>
        <p className="text-2xl font-extralight ">
          Mas você pode continuar navegando no nosso serviço, basta selecionar
          uma das opções da parte superior do site.
        </p>
      </div>
    </Body>
  );
}

export default Home;
