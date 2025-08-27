import { redirect } from 'next/navigation';

export default function DocsRootPage() {
  // Redirect the user from the root /docs page to the introduction page
  redirect('/docs/introduction');
}