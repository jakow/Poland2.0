import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Modal from '../components/Modal';
import Button from '../components/Button';

// tslint:disable
const text = `Quia voluptate fugiat velit et eos. Ipsum magni ut et suscipit. Qui optio beatae optio eaque tenetur omnis. Facere voluptas aut rerum eligendi esse voluptatum sint.
Aut labore quisquam enim harum tempore. Odio itaque voluptas occaecati quidem. Aut incidunt vel occaecati saepe repudiandae.
Et tenetur quas aspernatur. Quia vitae voluptatem molestias temporibus qui quo et maiores. Optio quaerat debitis est deleniti. Eius ut possimus quo.
Eum qui quia quibusdam et quae similique neque voluptatum. Qui iusto optio quia et corrupti tenetur voluptatibus sit. Quis voluptatem commodi cumque ipsa amet. Sit quae odio id voluptatibus. Id quo maxime iusto. Ea debitis enim eligendi consequatur quo.
Pariatur veritatis voluptatem enim voluptates deserunt. Quis odio error est. Quas porro ullam et. Temporibus placeat cumque adipisci quas et et distinctio. Nam quam id nulla sint distinctio. Aliquam qui quae quia harum.`
// tslint:enable

storiesOf('Modal', module)
  .add('default view', () => (
    <React.Fragment>
      <Modal trigger={<Button>Click me</Button>} label="storybook">
        <div style={{ width: '100%', backgroundColor: 'white' }}>
          {text}
        </div>
      </Modal>
      <div style={{ height: '100vh' }}/>
    </React.Fragment>
  ));
