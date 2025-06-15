
-- Add a featured column to the case_studies table
ALTER TABLE public.case_studies 
ADD COLUMN featured boolean DEFAULT false;

-- Update the existing case studies to have featured = false by default
UPDATE public.case_studies 
SET featured = false 
WHERE featured IS NULL;
