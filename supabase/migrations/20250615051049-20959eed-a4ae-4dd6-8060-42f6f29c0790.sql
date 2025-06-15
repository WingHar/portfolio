
-- Add featured_image_url column to projects table
ALTER TABLE public.projects 
ADD COLUMN featured_image_url TEXT;

-- Add general_images column to projects table (array of image URLs)
ALTER TABLE public.projects 
ADD COLUMN general_images TEXT[] DEFAULT '{}';

-- Add featured_image_url column to case_studies table
ALTER TABLE public.case_studies 
ADD COLUMN featured_image_url TEXT;

-- Add general_images column to case_studies table (array of image URLs)
ALTER TABLE public.case_studies 
ADD COLUMN general_images TEXT[] DEFAULT '{}';

-- Update existing projects to move current image_url to featured_image_url if featured
UPDATE public.projects 
SET featured_image_url = image_url 
WHERE featured = true AND image_url IS NOT NULL;

-- Update existing projects to move current image_url to general_images if not featured
UPDATE public.projects 
SET general_images = ARRAY[image_url] 
WHERE (featured = false OR featured IS NULL) AND image_url IS NOT NULL;

-- Update existing case studies to move current image_url to featured_image_url if featured
UPDATE public.case_studies 
SET featured_image_url = image_url 
WHERE featured = true AND image_url IS NOT NULL;

-- Update existing case studies to move current image_url to general_images if not featured
UPDATE public.case_studies 
SET general_images = ARRAY[image_url] 
WHERE (featured = false OR featured IS NULL) AND image_url IS NOT NULL;
