'use client';
import { Title, TextInput, Card, Button } from '@tremor/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuthContext } from '_context/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

const loginFormDefaultValues = { email: '', password: '' };

export default function LoginPage() {
  const { login, isLogin } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const formInstance = useForm({
    defaultValues: loginFormDefaultValues
  });
  const { handleSubmit, register } = formInstance;

  const onSubmit = async (data: typeof loginFormDefaultValues) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
    } catch (error) {
      // TODO: Handle error message
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLogin) {
      push('/');
    }
  }, [isLogin, push]);

  return (
    <main className="flex flex-col items-center p-4 md:p-10 mx-auto max-w-7xl space-y-6">
      <Title>Login</Title>
      <Card className="w-full max-w-[460px] !p-10">
        <FormProvider {...formInstance}>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              type="email"
              placeholder="Email"
              required
              {...register('email')}
            />
            <TextInput
              type="password"
              placeholder="Password"
              required
              {...register('password')}
            />

            <Button disabled={isLoading} loading={isLoading} type="submit">
              Sign in
            </Button>
          </form>
        </FormProvider>
      </Card>
    </main>
  );
}
