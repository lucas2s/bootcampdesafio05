import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';

import {Loading, Owner, IssueList, StateIssues} from './styles';

export default class Repository extends Component {

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
      })
    }).isRequired
  }

  state = {
    repository: {},
    issues: [],
    loading: 1,
    stateIssues: 'open',
  }

  async componentDidMount() {
    const { match } = this.props;
    const { stateIssues } = this.state;

    const repoName = decodeURIComponent( match.params.repository);

    const [repository, issues ] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: stateIssues,
          per_page: 5,
        }
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: 0,
    })
  }

  handleInputChange = async e => {
    this.setState({
      loading: 1,
    })

    const stateIssues = e.target.value;
    this.setState({ stateIssues: stateIssues });

    const issues = api.get(`/repos/${this.state.repository.name}/issues`, {
      params: {
        state: stateIssues,
        per_page: 5,
      }
    })

    this.setState({
      issues: issues.data,
      loading: 0,
    })

    console.log(stateIssues);
  };

  render () {

    const { repository, issues, loading, stateIssues } = this.state;

    if(loading) {
      return <Loading>Carregando</Loading>
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src= {repository.owner.avatar_url} alt={repository.name} />
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
          {
            issues.map (issue => (
              <li key={String(issue.id)}>
                  <img src={issue.user.avatar_url } alt={issue.user.login} />
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
          ))}
        </IssueList>
      </Container>
    )
  } 
}
