import Header from '@/components/Header';
import { AppContainer } from '@/components/layout';

const withPageLayout = (PageComponent) => (props) => (
  <>
    <Header />
    <AppContainer>
      <PageComponent {...props} />
    </AppContainer>
  </>
);

export default withPageLayout;
