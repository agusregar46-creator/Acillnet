
-- Fix touch_updated_at search_path
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- Lock down SECURITY DEFINER functions (only triggers / has_role need internal use)
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;

-- Replace overly-permissive INSERT policies with minimal validation
DROP POLICY IF EXISTS "anyone create payment" ON public.payments;
CREATE POLICY "anyone create payment" ON public.payments FOR INSERT
WITH CHECK (
  length(invoice) > 0
  AND length(customer_name) > 0
  AND length(customer_email) > 0
  AND length(wallet) > 0
  AND amount_sol > 0
);

DROP POLICY IF EXISTS "anyone send message" ON public.contact_messages;
CREATE POLICY "anyone send message" ON public.contact_messages FOR INSERT
WITH CHECK (
  length(name) BETWEEN 1 AND 200
  AND length(message) BETWEEN 1 AND 5000
);
