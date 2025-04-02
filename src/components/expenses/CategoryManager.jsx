import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const CategoryManager = ({ categories, setCategories, categoryTotals }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    color: '#2B992B'
  });

  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({ name: '', color: '#2B992B' });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingCategory) {
      setCategories(categories.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, ...formData }
          : cat
      ));
    } else {
      const newCategory = {
        id: Math.max(0, ...categories.map(c => c.id)) + 1,
        ...formData
      };
      setCategories([...categories, newCategory]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Categories</h2>
        <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>
      <div className="space-y-4">
        {categories.map((category) => {
          const total = categoryTotals.find(ct => ct.category === category.name)?.total || 0;
          
          return (
            <div key={category.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: category.color }} 
                />
                <span className="font-medium">{category.name}</span>
                <span className="text-sm text-gray-500">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setEditingCategory(category);
                    setFormData({ name: category.name, color: category.color });
                    setIsDialogOpen(true);
                  }}
                  className="p-2 hover:bg-gray-200 rounded-lg"
                >
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? 'Edit Category' : 'Add Category'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Category name"
                className="w-full px-4 py-2 rounded border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="h-10 w-full"
              />
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              {editingCategory ? 'Update' : 'Add'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryManager;