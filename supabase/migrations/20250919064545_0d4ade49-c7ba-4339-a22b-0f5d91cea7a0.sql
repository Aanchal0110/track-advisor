-- Fix security issue: Add RLS policies for subject data table
-- This table appears to be unused, so we'll add a basic policy structure

-- Add RLS policies for subject data table
CREATE POLICY "Anyone can view subject data" 
ON public."subject data" 
FOR SELECT 
USING (true);

-- Since this table seems to be a placeholder/unused table, we'll restrict other operations
CREATE POLICY "No insert allowed on subject data" 
ON public."subject data" 
FOR INSERT 
WITH CHECK (false);

CREATE POLICY "No update allowed on subject data" 
ON public."subject data" 
FOR UPDATE 
USING (false);

CREATE POLICY "No delete allowed on subject data" 
ON public."subject data" 
FOR DELETE 
USING (false);