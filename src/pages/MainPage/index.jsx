import { useState,useContext } from 'react';
import ListPokemon from '../../Componets/MainPage/ListPokemon/ListPokemon';
import { ThemeTogglerButton } from '../../Componets/themeTogglerButton/themeTogglerButton';
import pokedex from '../../assets/images/pokedexsemfundo.png'
import { Section, ListPokemonWrapper, PokedexContainer, ThemeButtonWrapper, ButtonsContainer, FilterColumn ,PokedexImg} from './style';
import {getId}from '../../services/utils'
import {Button} from '../../Componets/UI/Button/Button'
import TypeFilter from '../../Componets/MainPage/Filter/Fliter'
import {pokemonTypes} from '../../services/pokemonTypes'
import { ThemeContext } from '../../styles/Theme';

const MainPage = () => {
  const [pokemonIds, setPokemonIds] = useState([]);
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [limitReached, setLimitReached] = useState(false);
  const [selectedType, setSelectedType] = useState(''); // Estado para o tipo selecionado
  const [isLoading] = useState(false); // Estado de loading, se necessário
  const { theme } = useContext(ThemeContext);
  const handleClick = () => {
    if (allPokemonData.length >= 100) {
      setLimitReached(true);
      return;
    }
    const uniqueNumbers = getId(10, 1, 700);
    setPokemonIds(uniqueNumbers);
    setLimitReached(false);
  };

  const handleReset = () => {
    const resetIds = getId(10, 1, 700);
    setPokemonIds(resetIds);
    setAllPokemonData([]);
    setLimitReached(false);
    setSelectedType(null); // Reseta o tipo selecionado
  };

  return (
    <Section theme={theme}>
      <PokedexContainer theme={theme}>
        <PokedexImg src={pokedex} alt="Pokedex" />
        
        <ListPokemonWrapper theme={theme}>
          <ListPokemon
            pokemonIds={pokemonIds}
            setPokemonIds={setPokemonIds}
            allPokemonData={allPokemonData}
            setAllPokemonData={setAllPokemonData}
            limitReached={limitReached}
            setLimitReached={setLimitReached}
            selectedType={selectedType} // Passa o tipo selecionado
          />
        <Button onClick={handleClick} disabled={limitReached || isLoading}>
          {isLoading ? 'Carregando...' : 'Carregar mais...'}
        </Button>
        </ListPokemonWrapper>
    
     <FilterColumn>
      <TypeFilter
        types={pokemonTypes} // Passa a lista de tipos
        selectedType={selectedType ?? ''} // Passa o tipo selecionado
        onSelectType={setSelectedType} // Passa a função para atualizar o tipo
      />
      </FilterColumn>

      <ThemeButtonWrapper>
        <ThemeTogglerButton />
      </ThemeButtonWrapper>

      <ButtonsContainer>
        <Button onClick={handleReset}>Resetar Lista</Button>
        <Button onClick={() => setSelectedType(null)} disabled={!selectedType}>
          Mostrar Todos
        </Button>
      </ButtonsContainer>
      
      </PokedexContainer>

      
    </Section>
  );
};

export default MainPage;

