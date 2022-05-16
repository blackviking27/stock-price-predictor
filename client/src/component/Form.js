import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  Container,
  Text,
} from '@chakra-ui/react';

function Form() {
  const [company, setCompany] = useState('');
  const [open, setOpen] = useState(0);
  const [high, setHigh] = useState(0);
  const [low, setLow] = useState(0);
  const [close, setClose] = useState(0);
  const [adjClose, setAdjClose] = useState(0);
  const [res, setRes] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log('Predicted value');
    // console.log('company', company);
    // console.log('open', open);
    // console.log('high', high);
    // console.log('low', low);
    // console.log('close', close);
    // console.log('adjClose', adjClose);

    let reqData = JSON.stringify({
      company: company,
      open: open,
      high: high,
      low: low,
      close: close,
      adjClose: adjClose,
    });
    console.log(reqData);

    const data = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: reqData,
    }).then(data => data.json());
    setRes(data['data'][0]);
    console.log(data['data']);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <div>
            <Text marginBottom="2" w="100%">
              Company
            </Text>
            <Select
              isRequired
              onChange={e => setCompany(e.target.value)}
              maxW="100%"
              placeholder="Select Company"
            >
              <option value="apple">Apple</option>
              <option value="google">Google</option>
              <option value="tesla">Tesla</option>
              <option value="microsoft">Microsoft</option>
              <option value="amazon">Amazon</option>
            </Select>
          </div>
          <FormControl>
            <FormLabel htmlFor="open">Open</FormLabel>
            <Input
              id="open"
              type="number"
              step="0.001"
              isRequired
              onChange={e => setOpen(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="high">High</FormLabel>
            <Input
              id="high"
              type="number"
              step="0.001"
              isRequired
              onChange={e => setHigh(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="low">Low</FormLabel>
            <Input
              id="low"
              type="number"
              step="0.001"
              isRequired
              onChange={e => setLow(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="close">Close</FormLabel>
            <Input
              id="close"
              type="number"
              step="0.001"
              isRequired
              onChange={e => setClose(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="adjClose">Adj. Close</FormLabel>
            <Input
              id="adjClose"
              type="number"
              step="0.001"
              isRequired
              onChange={e => setAdjClose(e.target.value)}
            />
          </FormControl>
          <Button variant="solid" colorScheme="whatsapp" type="submit">
            Predict
          </Button>
        </Stack>
      </form>
      {res.length != 0 ? (
        <div>
          <h3>Next 5 days predicted closing value</h3>
          {res.map(val => (
            <span style={{ marginRight: '10px' }}>{val.toFixed(3)}</span>
          ))}
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default Form;
