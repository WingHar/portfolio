
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';

interface CaseStudyFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const CaseStudyForm: React.FC<CaseStudyFormProps> = ({ onSuccess, onCancel }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [featured, setFeatured] = useState(false);
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [generalImageFiles, setGeneralImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImageFile(file);
    }
  };

  const handleGeneralImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGeneralImageFiles(prev => [...prev, ...files]);
  };

  const removeGeneralImage = (index: number) => {
    setGeneralImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('case-study-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('case-study-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let featuredImageUrl = null;
      let generalImageUrls: string[] = [];
      
      if (featuredImageFile) {
        featuredImageUrl = await uploadImage(featuredImageFile);
        if (!featuredImageUrl) {
          toast({
            title: "Error",
            description: "Failed to upload featured image",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
      }

      for (const file of generalImageFiles) {
        const url = await uploadImage(file);
        if (url) {
          generalImageUrls.push(url);
        }
      }

      const { error } = await supabase
        .from('case_studies')
        .insert([
          {
            title,
            body,
            featured,
            featured_image_url: featuredImageUrl,
            general_images: generalImageUrls,
          },
        ]);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-portfolio-secondary/20 border-portfolio-tertiary/20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Create New Case Study</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="text-portfolio-primary-light hover:text-white"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-portfolio-primary-light">
            Title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="bg-portfolio-primary-dark/50 border-portfolio-tertiary/30 text-white"
          />
        </div>

        <div>
          <Label htmlFor="body" className="text-portfolio-primary-light">
            Body
          </Label>
          <Textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={6}
            className="bg-portfolio-primary-dark/50 border-portfolio-tertiary/30 text-white"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            checked={featured}
            onCheckedChange={(checked) => setFeatured(checked as boolean)}
            className="border-portfolio-tertiary/30"
          />
          <Label htmlFor="featured" className="text-portfolio-primary-light">
            Featured case study
          </Label>
        </div>

        <div>
          <Label htmlFor="featured-image" className="text-portfolio-primary-light">
            Featured Image (for homepage display)
          </Label>
          <div className="mt-1">
            <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-portfolio-tertiary/30 rounded-md cursor-pointer hover:border-portfolio-tertiary/50 transition-colors">
              <div className="text-center">
                {featuredImageFile ? (
                  <div className="text-portfolio-primary-light">
                    <Upload className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">{featuredImageFile.name}</span>
                  </div>
                ) : (
                  <div className="text-portfolio-primary-light">
                    <Upload className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">Click to upload featured image</span>
                  </div>
                )}
              </div>
              <input
                id="featured-image"
                type="file"
                accept="image/*"
                onChange={handleFeaturedImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div>
          <Label htmlFor="general-images" className="text-portfolio-primary-light">
            General Images (for detail page gallery)
          </Label>
          <div className="mt-1">
            <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-portfolio-tertiary/30 rounded-md cursor-pointer hover:border-portfolio-tertiary/50 transition-colors">
              <div className="text-center">
                <div className="text-portfolio-primary-light">
                  <Upload className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm">Click to upload general images</span>
                </div>
              </div>
              <input
                id="general-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleGeneralImagesChange}
                className="hidden"
              />
            </label>
          </div>
          {generalImageFiles.length > 0 && (
            <div className="mt-2 space-y-2">
              {generalImageFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-portfolio-primary-dark/30 p-2 rounded">
                  <span className="text-portfolio-primary-light text-sm">{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeGeneralImage(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-portfolio-tertiary/30 text-portfolio-primary-light hover:bg-portfolio-tertiary/20"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90"
          >
            {loading ? 'Creating...' : 'Create Case Study'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CaseStudyForm;
