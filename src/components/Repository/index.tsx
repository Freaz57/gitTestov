import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_REPO_DETAILS } from '../../resurce/get_repo_details.tsx';
import { Link } from 'react-router-dom';
import styles from './Reposiyory.module.scss'

interface ILanguage {
    name: string;
}

interface IRepository {
    name: string;
    stargazers: {
        totalCount: number;
    };
    updatedAt: string;
    owner: {
        login: string;
        avatarUrl: string;
        url: string;
    };
    description: string;
    languages: {
        nodes: ILanguage[];
    };
}

const Repository: React.FC = () => {
    const { owner, name } = useParams<{ owner: string; name: string }>();

    const { data, loading, error } = useQuery(GET_REPO_DETAILS, {
        variables: { owner, name },
    });

    if (loading) return <p>Loading...</p>;
    if (error || !data || !data.repository) return <p>Error: {error ? error.message : 'Repository not found'}</p>;

    const repository: IRepository = data.repository;

    return (
        <div className={styles.container}>
            <Link to="/" className={styles.btn}>Назад</Link>
            <h1>{repository.name} - {repository.stargazers.totalCount} stars - {new Date(repository.updatedAt).toLocaleDateString()}</h1>
            <div>
                <img src={repository.owner.avatarUrl} alt={repository.owner.login} width={50} />
                <a href={repository.owner.url} target="_blank" rel="noopener noreferrer">{repository.owner.login}</a>
            </div>
            <div>
                <h3>Languages</h3>
                <ul>
                    {repository.languages.nodes.map(language => (
                        <li key={language.name}>{language.name}</li>
                    ))}
                </ul>
            </div>
            <p>{repository.description}</p>
        </div>
    );
};

export default Repository;
