export default function FeesSection({ fees }: any) {
  if (!fees) return null;

  return (
    <section>
      <h2>Fees</h2>
      <p>Admission Fee: ₹{fees.one_time?.admission_fee}</p>
      <p>Security Deposit: ₹{fees.one_time?.security_deposit}</p>
      <hr />
    </section>
  );
}
