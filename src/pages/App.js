
import gitLogo from '../assets/github-4.png';
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import Button from '../components/Button';
import { useState } from 'react';
import { Container } from './styles';
import api from '../services/api';

function App() {

  const [CurrentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearch = async () => {

     if (!CurrentRepo.trim()) {
        alert('Informe um repositório!');
        return;
    }

    try{
      const { data } = await api.get(`/repos/${CurrentRepo}`);

      if(data.id) {
        
        const isExist = repos.find(repo => repo.id === data.id);

        if(!isExist) {
          setRepos(prev => [...prev, data]);
          setCurrentRepo('')
          return
        }
      }

    }catch (error) {

        if (error.response?.status === 404) {
            alert('Repositório não encontrado no GitHub!');
        } else {
            alert('Ocorreu um erro ao consultar o GitHub!');
            console.error(error);
        }

    }
    
  }

  const handleRemoveRepo = (id) => {
    setRepos(reposBefore => reposBefore.filter(repo => repo.id !== id));
};

  return (
    <Container>
      <img src={gitLogo} alt="GitHub Logo" width={72} height={72} />
      <Input value={CurrentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearch} />
      {repos.map(repo => (
        <ItemRepo key={repo.id} repo={repo} handleRemove={handleRemoveRepo}/>
      ))}
    </Container>
  );
}

export default App;
