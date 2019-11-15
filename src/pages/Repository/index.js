import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';

import { Loading, Owner, IssueList, StateIssues, Error } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.shape({}),
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: 1,
    stateIssues: 'open',
    error: 0,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { stateIssues } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: stateIssues,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: 0,
    });
  }

  handleInputChange = async e => {
    try {
      this.setState({
        loading: 1,
      });

      const stateIssues = e.target.value;
      this.setState({ stateIssues });

      const { repository } = this.state;

      const issues = await api.get(`/repos/${repository.full_name}/issues`, {
        params: {
          state: stateIssues,
          per_page: 5,
        },
      });

      this.setState({
        issues: issues.data,
        loading: 0,
      });
    } catch {
      this.setState({
        loading: 0,
        issues: [],
        error: 1,
      });
    }
  };

  render() {
    const { repository, issues, loading, stateIssues, error } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.name} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <StateIssues>
          <p>Issues State: </p>
          <select onChange={this.handleInputChange} value={stateIssues}>
            <option value="open">Abertas</option>
            <option value="closed">Fechadas</option>
            <option value="all">Todas</option>
          </select>
        </StateIssues>

        <IssueList>
          {error ? (
            <Error>Falha para realizar a consulta dos Issues</Error>
          ) : (
            issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map(label => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))
          )}
        </IssueList>
      </Container>
    );
  }
}
