import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Fighter, InsertFighter } from "@shared/schema";

export default function Fighters() {
  const [selectedFighter, setSelectedFighter] = useState<Fighter | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<InsertFighter>>({});
  const { toast } = useToast();

  const { data: fighters, isLoading } = useQuery({
    queryKey: ["/api/fighters"],
  });

  const addFighterMutation = useMutation({
    mutationFn: async (data: InsertFighter) => {
      const response = await apiRequest("POST", "/api/fighters", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/fighters"] });
      setIsAddDialogOpen(false);
      setFormData({});
      toast({ title: "Fighter added successfully" });
    },
    onError: () => {
      toast({ title: "Failed to add fighter", variant: "destructive" });
    },
  });

  const updateFighterMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertFighter> }) => {
      const response = await apiRequest("PUT", `/api/fighters/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/fighters"] });
      setIsEditDialogOpen(false);
      setSelectedFighter(null);
      setFormData({});
      toast({ title: "Fighter updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update fighter", variant: "destructive" });
    },
  });

  const deleteFighterMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/fighters/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/fighters"] });
      toast({ title: "Fighter deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete fighter", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFighter) {
      updateFighterMutation.mutate({ id: selectedFighter.id, data: formData });
    } else {
      addFighterMutation.mutate(formData as InsertFighter);
    }
  };

  const handleEdit = (fighter: Fighter) => {
    setSelectedFighter(fighter);
    setFormData(fighter);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this fighter?")) {
      deleteFighterMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900" data-testid="text-page-title">
          Fighter Management
        </h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-dark" data-testid="button-add-fighter">
              <Plus className="h-4 w-4 mr-2" />
              Add Fighter
            </Button>
          </DialogTrigger>
          <DialogContent data-testid="dialog-add-fighter">
            <DialogHeader>
              <DialogTitle>Add New Fighter</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <Label htmlFor="nickname">Nickname</Label>
                  <Input
                    id="nickname"
                    value={formData.nickname || ""}
                    onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                    data-testid="input-nickname"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age || ""}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                    required
                    data-testid="input-age"
                  />
                </div>
                <div>
                  <Label htmlFor="weightClass">Weight Class</Label>
                  <Input
                    id="weightClass"
                    value={formData.weightClass || ""}
                    onChange={(e) => setFormData({ ...formData, weightClass: e.target.value })}
                    required
                    data-testid="input-weight-class"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight || ""}
                    onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                    required
                    data-testid="input-weight"
                  />
                </div>
                <div>
                  <Label htmlFor="reach">Reach (inches)</Label>
                  <Input
                    id="reach"
                    type="number"
                    value={formData.reach || ""}
                    onChange={(e) => setFormData({ ...formData, reach: parseFloat(e.target.value) })}
                    required
                    data-testid="input-reach"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="record">Record (W-L-D)</Label>
                  <Input
                    id="record"
                    value={formData.record || ""}
                    onChange={(e) => setFormData({ ...formData, record: e.target.value })}
                    placeholder="15-3-0"
                    required
                    data-testid="input-record"
                  />
                </div>
                <div>
                  <Label htmlFor="fightingStyle">Fighting Style</Label>
                  <Input
                    id="fightingStyle"
                    value={formData.fightingStyle || ""}
                    onChange={(e) => setFormData({ ...formData, fightingStyle: e.target.value })}
                    required
                    data-testid="input-fighting-style"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl || ""}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  data-testid="input-image-url"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark"
                disabled={addFighterMutation.isPending}
                data-testid="button-submit"
              >
                {addFighterMutation.isPending ? "Adding..." : "Add Fighter"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fighters?.map((fighter: Fighter) => (
          <Card key={fighter.id} className="border border-gray-200" data-testid={`card-fighter-${fighter.id}`}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg" data-testid={`text-fighter-name-${fighter.id}`}>
                  {fighter.name}
                  {fighter.nickname && <span className="text-sm text-gray-500 ml-2">"{fighter.nickname}"</span>}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(fighter)}
                    data-testid={`button-edit-${fighter.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(fighter.id)}
                    data-testid={`button-delete-${fighter.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <img
                  src={fighter.imageUrl || "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120"}
                  alt={fighter.name}
                  className="w-16 h-16 rounded-lg object-cover"
                  data-testid={`img-fighter-${fighter.id}`}
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2" data-testid={`text-weight-class-${fighter.id}`}>
                    {fighter.weightClass} ({fighter.weight} lbs)
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Record:</span>
                      <span className="font-medium ml-1" data-testid={`text-record-${fighter.id}`}>
                        {fighter.record}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Style:</span>
                      <span className="font-medium ml-1" data-testid={`text-style-${fighter.id}`}>
                        {fighter.fightingStyle}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Reach:</span>
                      <span className="font-medium ml-1" data-testid={`text-reach-${fighter.id}`}>
                        {fighter.reach}"
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium ml-1" data-testid={`text-age-${fighter.id}`}>
                        {fighter.age}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent data-testid="dialog-edit-fighter">
          <DialogHeader>
            <DialogTitle>Edit Fighter</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  data-testid="input-edit-name"
                />
              </div>
              <div>
                <Label htmlFor="edit-nickname">Nickname</Label>
                <Input
                  id="edit-nickname"
                  value={formData.nickname || ""}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  data-testid="input-edit-nickname"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-age">Age</Label>
                <Input
                  id="edit-age"
                  type="number"
                  value={formData.age || ""}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                  required
                  data-testid="input-edit-age"
                />
              </div>
              <div>
                <Label htmlFor="edit-weightClass">Weight Class</Label>
                <Input
                  id="edit-weightClass"
                  value={formData.weightClass || ""}
                  onChange={(e) => setFormData({ ...formData, weightClass: e.target.value })}
                  required
                  data-testid="input-edit-weight-class"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-weight">Weight (lbs)</Label>
                <Input
                  id="edit-weight"
                  type="number"
                  value={formData.weight || ""}
                  onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                  required
                  data-testid="input-edit-weight"
                />
              </div>
              <div>
                <Label htmlFor="edit-reach">Reach (inches)</Label>
                <Input
                  id="edit-reach"
                  type="number"
                  value={formData.reach || ""}
                  onChange={(e) => setFormData({ ...formData, reach: parseFloat(e.target.value) })}
                  required
                  data-testid="input-edit-reach"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-record">Record (W-L-D)</Label>
                <Input
                  id="edit-record"
                  value={formData.record || ""}
                  onChange={(e) => setFormData({ ...formData, record: e.target.value })}
                  placeholder="15-3-0"
                  required
                  data-testid="input-edit-record"
                />
              </div>
              <div>
                <Label htmlFor="edit-fightingStyle">Fighting Style</Label>
                <Input
                  id="edit-fightingStyle"
                  value={formData.fightingStyle || ""}
                  onChange={(e) => setFormData({ ...formData, fightingStyle: e.target.value })}
                  required
                  data-testid="input-edit-fighting-style"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-imageUrl">Image URL</Label>
              <Input
                id="edit-imageUrl"
                value={formData.imageUrl || ""}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                data-testid="input-edit-image-url"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark"
              disabled={updateFighterMutation.isPending}
              data-testid="button-submit-edit"
            >
              {updateFighterMutation.isPending ? "Updating..." : "Update Fighter"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
