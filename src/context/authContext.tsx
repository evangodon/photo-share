import { useState, useEffect } from 'react';
import { signout as nextAuthSignout } from 'next-auth/client';
import { useSession } from 'next-auth/client';
import { useMutation } from 'urql';
import { FindUserByEmailQuery, CreateUserMutation } from '@/graphql/generated';
import { createContext } from './createContext';
import { User } from '@/types/index';

export const [useAuthContext, Provider] = createContext<{
  user: User | null;
  loading: boolean;
  signout: () => void;
}>();

const FindUserByEmail = /* GraphQL */ `
  query FindUserByEmail($email: String!) {
    findUserByEmail(email: $email) {
      _id
      email
      name
      image
    }
  }
`;

const CreateUser = /* GraphQL */ `
  mutation CreateUser($email: String!, $image: String!, $name: String!) {
    createUser(data: { email: $email, image: $image, name: $name }) {
      _id
      email
      name
      image
    }
  }
`;

const superUsers = ['spiffman92@gmail.com'];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [session] = useSession();
  const [_data, findUserByEmail] = useMutation<FindUserByEmailQuery>(FindUserByEmail);
  const [_userData, createUser] = useMutation<CreateUserMutation>(CreateUser);

  useEffect(() => {
    if (session?.user) {
      findOrCreateUser(session.user);
    }
  }, [session]);

  function setUserWithRightData({ _id, email, name, image }: Omit<User, 'isSuperUser'>) {
    setUser({ _id, email, name, image, isSuperUser: superUsers.includes(email) });
  }

  async function findOrCreateUser(nextAuthUser) {
    setLoading(true);
    try {
      const { data } = await findUserByEmail({ email: nextAuthUser.email });
      const user = data.findUserByEmail[0];

      if (user) {
        setUserWithRightData(user);
      } else {
        const { data } = await createUser({
          email: nextAuthUser.email,
          image: nextAuthUser.image,
          name: nextAuthUser.name,
        });

        const user = data.createUser;
        setUserWithRightData(user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function signout() {
    nextAuthSignout();
    setUser(null);
  }

  return (
    <>
      <Provider value={{ user, signout, loading }}>{children}</Provider>
    </>
  );
};
