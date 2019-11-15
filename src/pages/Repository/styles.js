import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

export const Error = styled.div`
  color: #ff0000;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }
  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 10px;
  margin-top: 10px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  & + li {
    margin-top: 10px;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;
        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const StateIssues = styled.div`
  padding-top: 10px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 14px;
    font-weight: bold;
    margin-right: 10px;
  }

  select {
    font-size: 13px;
    border: 2px solid #7159c1;
    border-radius: 5px;
  }
`;

export const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-top: 15px;

  span {
    font-size: 10px;
    margin: 5px 5px;
    font-weight: 600;
    padding: 5px 10px;
    background: #7159c1;
    border-radius: 50px;
    color: #fff;
  }
`;

export const ButtonPage = styled.button`
  border: none;
  background: #7159c1;
  border-radius: 10px;
  font-size: 10px;
  padding: 5px 10px;
  color: #fff;
  box-shadow: 4px 4px 4px #888;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none;
  }

  &:active {
    box-shadow: none;
  }
`;
