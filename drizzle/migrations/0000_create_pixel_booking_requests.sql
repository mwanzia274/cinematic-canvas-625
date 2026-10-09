CREATE TABLE public.booking_requests (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 reference uuid NOT NULL UNIQUE,
 package_id text NOT NULL CHECK (package_id IN ('portrait','wedding','events','brand','film','custom')),
 client_name text NOT NULL CHECK (char_length(client_name) BETWEEN 2 AND 100),
 email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
 phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 30),
 preferred_date date NOT NULL,
 preferred_time text NOT NULL CHECK (preferred_time IN ('Morning','Afternoon','Evening','Flexible')),
 location text NOT NULL CHECK (char_length(location) BETWEEN 2 AND 200),
 message text NOT NULL DEFAULT '' CHECK (char_length(message) <= 2000),
 status text NOT NULL DEFAULT 'requested' CHECK (status IN ('requested','confirmed','cancelled')),
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT (reference, package_id, client_name, email, phone, preferred_date, preferred_time, location, message) ON public.booking_requests TO anon, authenticated;
GRANT ALL ON public.booking_requests TO service_role;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can submit booking requests only" ON public.booking_requests FOR INSERT TO anon, authenticated WITH CHECK (status = 'requested');