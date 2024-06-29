import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { setQuery, setCurrentPage } from '../../store/features/searchSlice';
import { useLazyQuery} from '@apollo/client';
import { Link } from 'react-router-dom';
import {GET_USER_REPOS} from "../../resurce/get_user_repos.tsx";
import {SEARCH_REPOS} from "../../resurce/search_repos.tsx";

interface RepositoryNode {
    name: string;
    owner: {
        login: string;
    };
    stargazers: {
        totalCount: number;
    };
    updatedAt: string;
    url: string;
}

const Home: React.FC = () => {
    const query = useSelector((state: RootState) => state.search.query);
    const currentPage = useSelector((state: RootState) => state.search.currentPage);
    const dispatch = useDispatch<AppDispatch>();

    const [searchRepositories, { data: searchData, loading: searchLoading }] = useLazyQuery(SEARCH_REPOS);
    const [getUserRepositories, { data: userData, loading: userLoading }] = useLazyQuery(GET_USER_REPOS);

    useEffect(() => {
        const variables = {
            first: 10,
            after: currentPage > 1 ? (query ? searchData?.search.pageInfo.endCursor : userData?.viewer.repositories.pageInfo.endCursor) : null
        };

        if (query) {
            searchRepositories({ variables: { ...variables, query } });
        } else {
            getUserRepositories({ variables });
        }
    }, [query, currentPage]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setQuery(e.target.value));
        dispatch(setCurrentPage(1));
    };

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const repositories = query ? searchData?.search.edges : userData?.viewer.repositories.edges;

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Search repositories"
            />
            {(searchLoading || userLoading) && <p>Loading...</p>}
            <ul>
                {repositories?.map(({ node }: { node: RepositoryNode }) => (
                    <li key={node.name}>
                        <p>{node.owner.login}</p>
                        <Link to={`/repository/${node.owner.login}/${node.name}`}>{node.name}</Link> - {node.stargazers.totalCount} stars - {new Date(node.updatedAt).toLocaleDateString()} - <a href={node.url} target="_blank" rel="noopener noreferrer">GitHub</a>
                    </li>
                ))}
            </ul>
            <div>
                {[...Array(10)].map((_, i) => (
                    <button
                        key={`page-${i}`}
                        onClick={() => handlePageChange(i + 1)}
                        style={{ fontWeight: currentPage === i + 1 ? 'bold' : 'normal' }}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Home;
