import { Scene } from "./components/Scene";
import { Player } from "./components/Player";
import { Map } from "./components/Map";
import { Interface } from "./components/Interface";
import { GameProvider } from "./stores/game";

function App() {
    return (
        <GameProvider>
            <Scene>
                <Player />
                <Map />
            </Scene>
            <Interface />
        </GameProvider>
    );
}

export default App;
