import Loadable from 'react-loadable';

import Loading from '../components/loading';

export default function(name) {
  return new Loadable({
    loader: () => import(`../pages/${name}`),
    loading: Loading,
  });
}
