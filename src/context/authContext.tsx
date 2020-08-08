import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useMutation, useQuery } from 'urql';
import { FindUserByEmailQuery, CreateUserMutation } from '@/graphql/generated';
import { createContext } from './createContext';

type User = {
  _id: string;
  email: string;
  name: string;
  image?: string;
};

export const [useAuthContext, Provider] = createContext<{
  user: User;
  loading: boolean;
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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(false);
  const [session] = useSession();
  const [_data, findUserByEmail] = useMutation<FindUserByEmailQuery>(FindUserByEmail);
  const [_userData, createUser] = useMutation<CreateUserMutation>(CreateUser);

  useEffect(() => {
    if (session?.user) {
      findOrCreateUser(session.user);
    }
  }, [session]);

  async function findOrCreateUser(nextAuthUser) {
    setLoading(true);
    try {
      const { data } = await findUserByEmail({ email: nextAuthUser.email });
      const user = data.findUserByEmail[0];

      if (user) {
        const { email, image, _id, name } = user;
        setUser({ _id, email, image, name });
      } else {
        const { data } = await createUser({
          email: nextAuthUser.email,
          image: nextAuthUser.image,
          name: nextAuthUser.name,
        });

        const { _id, email, image } = data.createUser;
        setUser({ _id, email, image, name });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Provider value={{ user, loading }}>{children}</Provider>
    </>
  );
};
