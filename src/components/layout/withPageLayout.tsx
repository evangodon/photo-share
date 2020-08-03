import Header from '@/components/layout/Header';
import { AppContainer } from '@/components/layout';

const withPageLayout = (PageComponent) => (props) => (
  <>
    <Header authProviders={props.authProviders} />
    <AppContainer>
      <PageComponent {...props} />
    </AppContainer>
  </>
);

export default withPageLayout;
