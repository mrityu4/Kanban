import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import './Display.css';

import { useAuth } from './AuthContext';

const Display = () => {
  const { groupingOption, orderingOption } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        console.log(response.data);

        const { tickets, users } = response.data;
        setTickets(tickets);
        setUsers(users);
        setUniqueUsers(Array.from(new Set(tickets.map(ticket => ticket.userId))));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const usersMap = users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});

  const groupAndSortTickets = (tickets, groupingKey, sortingKey) => {
    const groupedTickets = tickets.reduce((acc, ticket) => {
      const key = groupingOption === 'uniqueUsers' ? usersMap[ticket[groupingKey]] : ticket[groupingKey];
      acc[key] = acc[key] || { tickets: [], count: 0 };
      acc[key].tickets.push(ticket);
      acc[key].count += 1;
      return acc;
    }, {});

    Object.keys(groupedTickets).forEach(key => {
      groupedTickets[key].tickets.sort((a, b) => b[sortingKey] - a[sortingKey]);
    });

    return groupedTickets;
  };

  let ticketsObject = {};

  if (groupingOption === 'statuses' && orderingOption === 'Priority') {
    ticketsObject = groupAndSortTickets(tickets, 'status', 'priority');
  } else if (groupingOption === 'statuses' && orderingOption === 'Title') {
    ticketsObject = groupAndSortTickets(tickets, 'status', 'title');
  } else if (groupingOption === 'uniqueUsers' && orderingOption === 'Priority') {
    ticketsObject = groupAndSortTickets(tickets, 'userId', 'priority');
  } else if (groupingOption === 'uniqueUsers' && orderingOption === 'Title') {
    ticketsObject = groupAndSortTickets(tickets, 'userId', 'title');
  } else if (groupingOption === 'priorities' && orderingOption === 'Priority') {
    ticketsObject = groupAndSortTickets(tickets, 'priority', 'priority');
  } else if (groupingOption === 'priorities' && orderingOption === 'Title') {
    ticketsObject = groupAndSortTickets(tickets, 'priority', 'title');
  }

  console.log(ticketsObject);
  const idStyle = { fontFamily: 'serif', fontSize: '15px', color: 'gray' };
  const titleStyle = { fontFamily: 'serif', fontSize: '18px', color: 'black' };
  const tagStyle = { fontFamily: 'serif', fontSize: '13px', color: 'gray',  border: '0.5px solid gray',
  padding: '2px 5px', borderRadius: '5px',};

  const getPriorityLabel = (priorityKey) => {
    switch (priorityKey) {
      case '0':
        return '✖️ No Priority        ';
      case '1':
        return '👇🏼 Low Priority       ';
      case '2':
        return '🕛 Medium Priority    ';
      case '3':
        return '👆🏼 High Priority      ';
      case '4':
        return '⏰ Urgent Priority    ';
      case 'Todo':
        return '🟠 Todo               ';
      case 'In progress':
          return '🟢 In progress      ';
      case 'Backlog':
            return '⚫ Backlog        ';

      default:
        // Return the key itself if it doesn't match any of the cases above
        return priorityKey;
    }
  };

  return (
  <div className="display-container">
    {Object.keys(ticketsObject).map(key => (
      <div key={key} className="column">
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '10px' }}>
          <h2 style={{ fontFamily: 'serif', fontSize: '13px' }}>
            {getPriorityLabel(key)} {ticketsObject[key]?.count}
          </h2>
        </div>

        <ul>
          {ticketsObject[key]?.tickets.map(ticket => (
            <Card
              key={ticket.id}
              id={<span style={idStyle}>{ticket.id}</span>}
              title={<span style={titleStyle}>{ticket.title}</span>}
              tag={<span style={tagStyle}>{ticket.tag}</span>}
            />
          ))}
        </ul>
      </div>
    ))}
  </div>
);

};

export default Display;
